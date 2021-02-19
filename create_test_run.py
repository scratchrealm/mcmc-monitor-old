import kachery_p2p as kp
import uuid

def _random_id():
    return str(uuid.uuid4())[-12:]

def main():
    f = kp.create_feed('test-mcmc-monitor')
    run_id = 'run-' + _random_id()
    sf = f.get_subfeed(run_id)
    print(sf.get_uri())

if __name__ == '__main__':
    main()