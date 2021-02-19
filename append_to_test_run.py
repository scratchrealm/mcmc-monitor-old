import kachery_p2p as kp
import uuid
import time
import random

def _random_id():
    return str(uuid.uuid4())[-12:]

def main():
    sf = kp.load_subfeed('feed://06be8019f2d6d81ceb6211322404409c0cf246cacde0097f55009593498296cb/run-60cd38a7382d')
    parameters = {
        'lp__': random.random()
    }
    sf.append_message({'type': 'iteration', 'timestamp': time.time(), 'parameters': parameters})

if __name__ == '__main__':
    main()