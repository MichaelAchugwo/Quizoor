import styles from "../css/Hero.module.css";

export default function Home() {
  return (
    <>
      <video autoPlay muted loop className={styles.backgroundVideo}>
        <source src="/videos/backgroundVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={`${styles.overlay}`}>

      </div>
    </>
  );
}
