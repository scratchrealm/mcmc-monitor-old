FROM continuumio/miniconda3

WORKDIR /app

# Create the environment:
RUN conda create -n myenv python=3.8

# Make RUN commands use the new environment:
SHELL ["conda", "run", "-n", "myenv", "/bin/bash", "-c"]

RUN conda install -c conda-forge nodejs
RUN npm install -g serve
RUN pip install mcmc-monitor==0.1.4

# Make sure the environment is activated:
RUN echo "Make sure mcmc-monitor is installed:"
RUN python -c "import mcmc_monitor"

ENV PYTHONUNBUFFERED=1
COPY entrypoint.sh /entrypoint.sh
COPY run.sh /run.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/run.sh"]