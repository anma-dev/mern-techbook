import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'

import vector from '../../images/Vector.png'
import facebook from '../../images/Facebook.png'
import twitter from '../../images/Twitter.png'
import linkedin from '../../images/LinkedIn.png'
import basket from '../../images/basket.png'

import { useSelector, useDispatch } from 'react-redux'
import { getUser, logout } from '../../store/userSlice'

const Header = () => {
  const user = useSelector(getUser)

  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false)

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const toggleHandler = () => {
    setToggle(!toggle)
    let html = document.getElementsByTagName('html')[0]

    if (windowWidth <= 850) {
      if (!toggle) {
        html.style.cssText = 'overflow-y:hidden'
      } else {
        html.style.cssText = 'overflow-y:initial'
      }
    } else {
      return
    }
  }

  const handleWindowSizeChange = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])
  console.log(windowWidth)

  return (
    <header className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.leftWrapper}>
          <Link
            className={styles.logoWrapper}
            to="/"
          >
            <img
              width={24.5}
              src={vector}
              alt="Books Website logo"
            />
            <p>TechB</p>
          </Link>

          <div className={styles.headerIcons}>
            <Link>
              <img
                src={facebook}
                alt="facebook"
              />
            </Link>
            <Link>
              <img
                src={twitter}
                alt="twitter"
              />
            </Link>
            <Link>
              <img
                src={linkedin}
                alt="linkedin"
              />
            </Link>
          </div>
        </div>
        <nav
          className={`${styles.navbar} ${toggle ? `${styles.active}` : null}`}
        >
          <ul className={styles.pagesList}>
            <li>
              <Link onClick={toggleHandler}>Home</Link>
            </li>
            <li>
              <Link onClick={toggleHandler}>Store</Link>
            </li>
            <li>
              <Link onClick={toggleHandler}>Blog</Link>
            </li>
            <li>
              <Link onClick={toggleHandler}>Forum</Link>
            </li>
            <li>
              <Link onClick={toggleHandler}>Contact</Link>
            </li>
            <button className={styles.basketButton}>
              <img
                width={22}
                src={basket}
                alt="basket"
              />
              <p>0</p>
            </button>
          </ul>
          {user.length !== 0 ? (
            <button
              onClick={() => dispatch(logout())}
              className={`${styles.orderToday} ${styles.logout}`}
            >
              Logout
            </button>
          ) : (
            <div className={styles.orderTodayWrapper}>
              <button className={styles.orderToday}>Order Today</button>
              <div>
                <Link
                  onClick={toggleHandler}
                  to="/signup"
                >
                  Signup
                </Link>
                <Link
                  onClick={toggleHandler}
                  to="/login"
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </nav>
        <button
          className={`${styles.toggle} ${toggle && `${styles.active}`}`}
          onClick={() => toggleHandler()}
        >
          <b></b>
          <b></b>
          <b></b>
        </button>
      </div>
    </header>
  )
}

export default Header