import React, { Component } from 'react'
import TopSplash from './TopSplash';
export default class Home extends Component {
  render() {
    return (
      <div>
        <TopSplash />
        <section style={styles.about}>
        <div style={styles.container}>
          <h1 style={styles.heading}>ABOUT</h1>
          <div style={styles.about_container}>
            <div style={styles.headshot_container}>
              <img style={styles.headshot} src="/images/headshot.jpg"/>
            </div>
            <div style={styles.info_container}>
            <p>Raclette pok pok lomo, master cleanse 90s deep v kitsch before they sold out church-key. Air plant chillwave small batch iceland, af wayfarers selfies. Woke taiyaki freegan VHS brunch glossier small batch edison bulb. Brunch etsy art party pork belly drinking vinegar. Seitan cardigan slow-carb food truck, polaroid chicharrones gluten-free meggings austin pop-up brunch street art. Migas twee banh mi vice. </p>
            <p>VHS squid sustainable bitters pinterest hammock chillwave venmo farm-to-table. Venmo artisan YOLO selfies taiyaki deep v literally retro tumblr. Subway tile four dollar toast kale chips, selfies hella palo santo heirloom lyft small batch kickstarter. +1 lyft copper mug chia edison bulb fashion axe, cornhole adaptogen DIY banh mi iceland kinfolk cold-pressed slow-carb. Raclette brooklyn pork belly pop-up letterpress fashion axe.</p>
            <p>Try-hard helvetica activated charcoal ennui, ethical flexitarian vegan aesthetic la croix jean shorts thundercats. Slow-carb chicharrones green juice banjo. Hashtag vice sustainable roof party. Pour-over man braid keytar flannel. Kickstarter chicharrones XOXO mumblecore, banh mi hella farm-to-table asymmetrical synth. Letterpress ugh lomo meh, wolf master cleanse trust fund kinfolk cred butcher literally hella taxidermy 8-bit deep v. Edison bulb cronut 90s, freegan master cleanse direct trade iceland irony disrupt seitan listicle. Yr kale chips gochujang readymade raw denim thundercats leggings gentrify affogato. Taxidermy four dollar toast biodiesel beard ramps. Chicharrones slow-carb try-hard hashtag ethical kogi. Pok pok wayfarers hella adaptogen. </p>
            </div>
          </div>
        </div>
        </section>
      </div>
    );
  }
}

const styles = {
  container : {
    maxWidth:'1200px',
    margin:'auto',
	padding: '25px',
  },
  about : {

  },
  heading : {
    textAlign:'center',
  },
  about_container : {
    display:'flex',
    justifyContent: 'center',
  },
  headshot : {
    width:'100%',
  },
  info_container: {
    padding:'25px',
    width:'80%',
  }
}
