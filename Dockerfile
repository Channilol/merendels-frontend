# Usa un'immagine base per Node.js
FROM node:18-alpine AS builder

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file package.json e package-lock.json
COPY package.json package-lock.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice
COPY . .

# Costruisci l'applicazione React per la produzione
RUN npm run build

# Usa un'immagine Nginx leggera per servire l'applicazione
FROM nginx:alpine

# Rimuovi i file di configurazione predefiniti di Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia l'applicazione React costruita nella directory di Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copia il tuo file di configurazione Nginx personalizzato (se ne hai uno)
COPY nginx.conf /etc/nginx/conf.d/merendels.conf

# Espone la porta su cui Nginx girerà
EXPOSE 80

# Comando per avviare Nginx
CMD ["nginx", "-g", "daemon off;"]