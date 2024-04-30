# Especifica a imagem base do Node
FROM node:16

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências e instala as dependências
COPY package*.json ./
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta que o React roda por padrão
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
