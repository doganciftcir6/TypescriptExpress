FROM node:18

# Projenin kaynak dosyalarını nereye kopyalayacağımızı belirtiyoruz.
WORKDIR /home/deneme/denemeapp

# Gerekli dosyaları kopyalıyoruz.
COPY package*.json ./

# package.json'daki gerekli kütüphaneleri yüklüyoruz.
RUN npm install

# Bütün kaynak kodları workdir'de belirttiğimiz klasöre kopyalıyoruz.
COPY . /home/deneme/denemeapp

# Kullanılacak port.
EXPOSE 4000

# Docker çalıştırıldığında çalıştırılacak komut.
CMD ["npm", "run", "dev"]