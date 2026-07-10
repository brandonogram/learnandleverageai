FROM llai:rollback-c798ef1

USER root
RUN rm -rf /app && mkdir -p /recovery && chown 1001:1001 /recovery
COPY --chown=1001:1001 server.mjs /recovery/server.mjs

USER 1001
WORKDIR /recovery
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

ENTRYPOINT []
CMD ["node", "/recovery/server.mjs"]
