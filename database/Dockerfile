FROM postgres:17.2-alpine3.21
EXPOSE 5432 5432/udp
VOLUME [ "/var/lib/postgresql/data" ]
ENTRYPOINT ["docker-entrypoint.sh"]
CMD [ "postgres" ]