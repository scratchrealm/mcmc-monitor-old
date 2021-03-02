FROM continuumio/miniconda3

WORKDIR /app

# Create the environment:
RUN conda create -n myenv python=3.8

# Make RUN commands use the new environment:
SHELL ["conda", "run", "-n", "myenv", "/bin/bash", "-c"]

RUN conda install -c conda-forge nodejs
RUN pip install websockets asyncio

# The code to run when container is started:
COPY run.py /run.py
COPY entrypoint.sh /entrypoint.sh

ENV PYTHONUNBUFFERED=1

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/run.py"]