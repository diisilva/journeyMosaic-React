const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // O ponto de entrada do seu aplicativo
    output: { // Onde os arquivos compilados serão salvos
        path: path.resolve(__dirname, 'dist'), // Crie uma pasta 'dist' para produção
        filename: 'bundle.js' // O nome do arquivo do bundle
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Para todos os arquivos .js
                exclude: /node_modules/, // Exceto a pasta node_modules
                use: {
                    loader: 'babel-loader' // Use o loader do babel
                }
            },
            {
                test: /\.css$/, // Para todos os arquivos .css
                use: ['style-loader', 'css-loader'] // Use os loaders de style e css
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/, // Para imagens
                use: ['file-loader'] // Use o file-loader
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // O template base para o arquivo HTML
            favicon: './public/favicon.ico' // Opcional: o favicon do seu app
        })
    ],
    devServer: { // Configuração do servidor de desenvolvimento
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000, // A porta que deseja usar
        open: true // Abra o navegador após iniciar o servidor
    }
};
