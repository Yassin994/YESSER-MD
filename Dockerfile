FROM node:lts-buster
RUN git clone https://github.com/Yassin994/YESSER-MD/ /root/Yassin994
WORKDIR /root/Yassin994/
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
