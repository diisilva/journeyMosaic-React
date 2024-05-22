# Especifica a imagem base do Node
FROM node:16

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Instala as dependências de produção
RUN npm install react-calendar

# Expõe a porta que o React roda por padrão
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
