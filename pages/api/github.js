import { normalizeGitHubCommitUrl } from '../../lib/helpers'

const isRelevantEventType = type =>
  ['PushEvent', 'PullRequestEvent', 'WatchEvent'].includes(type)

const getMessage = (type, payload, repo) => {
  switch (type) {
    case 'PushEvent':
      return payload.commits?.[0]?.message || 'No commit message'
    case 'PullRequestEvent':
      return payload.pull_request.title
    case 'WatchEvent':
      return `starred ${repo.name}`
    default:
      return null
  }
}

const getUrl = (type, payload, repo) => {
  switch (type) {
    case 'PushEvent':
      return payload.commits?.[0]?.url
        ? normalizeGitHubCommitUrl(payload.commits[0].url)
        : 'https://github.com/HappyHackingSpace'
    case 'PullRequestEvent':
      return payload.pull_request.html_url
    case 'WatchEvent':
      return `https://github.com/${repo.name}`
    default:
      return `https://github.com/HappyHackingSpace`
  }
}

export async function fetchGitHub() {
  try {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'HappyHackingSpace-Website'
    };

    const reposResponse = await fetch(
      'https://api.github.com/orgs/HappyHackingSpace/repos?sort=pushed&direction=desc&per_page=5',
      { headers }
    );

    if (!reposResponse.ok) {
      return [];
    }

    const repos = await reposResponse.json();

    if (!repos.length) {
      return [];
    }

    const topRepos = repos.slice(0, 3);
    const allCommits = [];

    const commitPromises = topRepos.map(async (repo) => {
      try {
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${repo.full_name}/commits?per_page=3`,
          { headers }
        );

        if (!commitsResponse.ok) {
          return [];
        }

        const commits = await commitsResponse.json();
        
        return commits.map(commit => {
          if (commit.author?.login?.endsWith('[bot]') || 
              commit.commit?.author?.name?.includes('[bot]')) {
            return null;
          }

          return {
            type: 'PushEvent',
            user: commit.author?.login || commit.commit?.author?.name || 'Unknown',
            userImage: commit.author?.avatar_url || 'https://github.com/ghost.png',
            url: commit.html_url,
            message: commit.commit?.message?.split('\n')[0] || 'No message',
            time: commit.commit?.author?.date || commit.commit?.committer?.date,
            repoName: repo.name,
            repoUrl: repo.html_url
          };
        }).filter(Boolean);

      } catch (error) {
        return [];
      }
    });

    const commitArrays = await Promise.all(commitPromises);
    
    commitArrays.forEach(commits => {
      allCommits.push(...commits);
    });

    return allCommits
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 3);

  } catch (error) {
    return [];
  }
}

export default async function github(req, res) {
  try {
    const git = await fetchGitHub();
    res.status(200).json(git);
  } catch (error) {
    res.status(500).json([]);
  }
}