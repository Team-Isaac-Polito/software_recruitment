FROM ubuntu
ADD index.html ./frontend/.

RUN apt update
RUN apt install -y python3

ENTRYPOINT ["python3", "-m", "http.server", "-d", "/frontend"]