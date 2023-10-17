FROM tomcat:9-jdk11

COPY ./web.xml /usr/local/tomcat/conf/web.xml

# Directorio para aplicaciones
RUN mkdir -p /usr/local/tomcat/webapps_custom
VOLUME /usr/local/tomcat/webapps_custom

CMD ["catalina.sh", "run"]