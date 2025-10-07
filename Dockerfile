# Node.js 18 sürümünü temel alan bir Docker imajı kullan
FROM node:18

# Çalışma dizini oluştur

WORKDIR /app

# Bağlılık dosyalarını kopyala

COPY package.json yarn.lock ./

# Bağımlılıkları yükle
RUN yarn install

# Tüm dosyaları kopyala
COPY .. .

# Geliştime sunucusunu başlat
CMD ["yarn", "dev"]