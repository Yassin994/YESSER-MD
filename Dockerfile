FROM node:lts-buster
RUN git clone https://github.com/Xiangzaoh/Zax-Md/ /root/Xiangzaoh
WORKDIR /root/Xiangzaoh/
RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

RUN npm install
EXPOSE 8000
CMD ["npm", "start"]
