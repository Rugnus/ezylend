import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Header from '../../components/header'
import { useSession, signIn, signOut } from "next-auth/react"


export default function Home() {
  const { data: session, status } = useSession()
  return (
      <div className={styles.body}>
      <style jsx global>{`
        body {
          background: rgb(220,253,255); 
          background: linear-gradient(135deg, rgba(220,253,255,1) 20%, rgba(215,164,255,1) 150%);
        }
      `}</style>
        <Header/>
        <div className={styles.main_section}>
          <div className={styles.main_text}>
            <div className={styles.title}>Ваше решение для заимствования денег выгодно и безопасно.</div>
            <div className={styles.desc}>
              EzyLend - это веб-сервис который позволяет заемщикам получать кредиты в криптовалюте без участия посредников и безопасно возвращать их с помощью смарт контрактов. 
              <br/>Благодаря EzyLend пользователи могут получать доступ к низким процентным ставкам и удобному процессу оформления кредитования.
            </div>
          </div>
          <div className={styles.main_image}>
            <Image src={"/main_image.svg"} width={553} height={413}/>
          </div>
        </div>

        <div className={styles.solution}>
          <div className={styles.solution_title}>Что мы предлагаем?</div>
          <div className={styles.solution_cards}>
            <div className={styles.solution_card}>
              <Image src={"/lend_card.svg"} width={250} height={250}/>
              <p>Заимствование активов</p>
            </div>
            <div className={styles.solution_card}>
              <Image src={"/earn_card.svg"} width={250} height={250}/>
              <p>Заработок активов</p>
            </div>
            <div className={styles.solution_card}>
              <Image src={"/multiply_card.svg"} width={250} height={250}/>
              <p>Вложение активов</p>
            </div>
            
          </div>
        </div>

        <div className={styles.techs}>
          <div className={styles.techs_title}>Технологии</div>
          <div className={styles.techs_cards}>
            <div className={styles.techs_card}><Image src={"technologies/btc.svg"} width={25} height={25}/><span>Bitcoin</span></div>
            <div className={styles.techs_card}><Image src={"technologies/eth.svg"} width={25} height={25}/><span>Ethereum</span></div>
            <div className={styles.techs_card}><Image src={"technologies/usdt.svg"} width={25} height={25}/><span>USDT</span></div>  
          </div>

          <div className={styles.techs_cards2}>
            <div className={styles.techs_card}><Image src={"technologies/uni.svg"} width={25} height={25}/><span>Uniswap</span></div>
            <div className={styles.techs_card}><Image src={"technologies/Polygon.svg"} width={25} height={25}/><span>Polygon</span></div>
          </div>
          
        </div>

        <div className={styles.footer}>
          <p>©EzyLend 2023</p>
        </div>
      </div>
  )
}
