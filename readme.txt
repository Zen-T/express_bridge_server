Goal:
    "chat-server.js" defined a nodejs express server that act as a bridge forwarding post request to OpenAI chat API using https protocol

Usage：

    Run server:
        node chat-server.js

    Generate SSL certificate:

        生成私钥
        openssl genpkey -algorithm RSA -out private-key.pem

        生成公钥和自签名证书
        openssl req -new -key private-key.pem -out certificate.csr
        openssl x509 -req -days 365 -in certificate.csr -signkey private-key.pem -out certificate.pem
