# Sử dụng image Node.js chính thức
FROM node:18

# Tạo thư mục làm việc trong container
WORKDIR /app

# Cài đặt các dependencies trực tiếp
RUN npm install axios@^1.7.2 dotenv@^16.4.5

# Copy file index.js vào container
COPY index.js .

# Chạy ứng dụng
CMD ["node", "index.js"] 