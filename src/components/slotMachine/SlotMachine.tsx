import './index.css';

import axios from 'axios';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { setCalculateCoins, setDecreaseCoins } from '../../features/userSlice';
import { selectUser } from '../../features/userSlice';
import ArrowBack from '../arrowBack/ArrowBack';
import Header from '../header/Header';

function SlotMachine() {
  const [coins, setCoins] = useState(0);
  const [rolling, setRolling] = useState(false);
  const slotRef = [useRef(null), useRef(null), useRef(null)];
  const fruits = ['🍒', '🍋', '🍎', '🍋', '🍌', '🍌', '🍋', '🍋'];
  const fruits2 = ['🍋', '🍎', '🍋', '🍋', '🍒', '🍎', '🍌', '🍋'];
  const fruits3 = ['🍋', '🍎', '🍋', '🍎', '🍒', '🍋', '🍌', '🍋'];
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // to trigger roolling and maintain state
  const roll = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/slotMachine`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const responseSlotMachine = res.data.allSlots;
        const earningCoins = responseSlotMachine.points;

        dispatch(setDecreaseCoins());
        dispatch(setCalculateCoins(earningCoins));

        setRolling(true);
        setCoins(earningCoins);
        setTimeout(() => {
          setRolling(false);
          setCoins(0);
        }, 1400);

        // looping through all 3 slots to start rolling
        slotRef.forEach((slot, i) => {
          // this will trigger rolling effect
          if (i + 1 == 1) {
            triggerSlotRotation(slot.current, fruits, responseSlotMachine.slot1);
          } else if (i + 1 == 2) {
            triggerSlotRotation(slot.current, fruits2, responseSlotMachine.slot2);
          } else {
            triggerSlotRotation(slot.current, fruits3, responseSlotMachine.slot3);
          }
        });
      });
  };

  // this will create a rolling effect and return random selected option
  const triggerSlotRotation = (ref: any, fruits: string[], fruit: string) => {
    function setTop(top: any) {
      ref.style.top = `${top}px`;
    }
    const options = ref.children;
    const optionFiltered = Array.from(options).filter((div: any) => {
      return div.children[0].innerHTML == fruit;
    });
    const chooserOption: any = optionFiltered[0];
    setTop(-chooserOption.offsetTop + 2);
  };

  return (
    <div className="containerSlotMachine">
      <Header />
      <ArrowBack url="/home" />

      {coins > 0 ? (
        <div className="divMsgWinner">
          <p>WINNER</p>
          <span>{coins}</span>
        </div>
      ) : null}

      <div className="contentSlotMachine">
        <div className="SlotMachine">
          <div className="slot">
            <section>
              <div className="fruit" ref={slotRef[0]}>
                {fruits.map((fruit, i) => (
                  <div key={i}>
                    <span>{fruit}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="slot">
            <section>
              <div className="fruit" ref={slotRef[1]}>
                {fruits2.map((fruit, i) => (
                  <div key={i}>
                    <span>{fruit}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="slot">
            <section>
              <div className="fruit" ref={slotRef[2]}>
                {fruits3.map((fruit, i) => (
                  <div key={i}>
                    <span>{fruit}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div
          className={!rolling ? 'roll rolling' : 'roll'}
          onClick={roll}
          // disabled={rolling}
        >
          {rolling ? 'ROLLING' : 'ROLL'}
        </div>

        <div className="results">
          <div>🪙 {user.user.coins}</div>
        </div>

        <div className="rewards">
          <h2>REWARDS</h2>
          <span>● 3 cherries in a row: 50 coins, 2 cherries in a row: 40 coins</span>
          <span>● 3 Apples in a row: 20 coins, 2 Apples in a row: 10 coins</span>
          <span>● 3 Bananas in a row: 15 coins, 2 Bananas in a row: 5 coins</span>
          <span>● 3 lemons in a row: 3 coins</span>
        </div>
      </div>
    </div>
  );
}

export default SlotMachine;
