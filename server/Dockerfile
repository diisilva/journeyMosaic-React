# Especifica a imagem base do Node
FROM node:16

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências e instala as dependências
COPY package*.json ./
RUN npm install bcrypt cors

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta que o server roda por padrão
EXPOSE 4000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
