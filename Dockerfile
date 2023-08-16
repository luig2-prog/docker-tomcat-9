FROM tomcat:9-jdk11

COPY ./web.xml /usr/local/tomcat/conf/web.xml

COPY ./config.widget.js /usr/local/tomcat/webapps/config.widget.js

COPY ./index.html /usr/local/tomcat/webapps/index.html