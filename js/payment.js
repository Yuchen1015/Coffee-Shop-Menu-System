var mainElement = document.querySelector(".PaymentContainer");
var walkInCard = document.querySelector(".walkIn.headerContainer");
var driveThCard = document.querySelector(".driveTh.headerContainer");
let closeBtn = document.querySelectorAll(".closeBtn");

walkInCard.addEventListener("click", () => {
  mainElement.classList.add("walkInActive");
});

driveThCard.addEventListener("click", () => {
  mainElement.classList.add("driveThActive");
});

for (var i = 0; i < closeBtn.length; i++) {
  closeBtn[i].addEventListener("click", () => {
    mainElement.classList.remove("walkInActive");
    mainElement.classList.remove("driveThActive");
  });
}

var locationSelect = document.getElementsByClassName("mapSelect");

for (let i = 0; i < locationSelect.length; i++) {
  locationSelect[i].addEventListener("change", function () {
    var locationChoise = this.selectedIndex;
    var locationParent = locationSelect[i].parentElement;
    var map = locationParent.children.item(2);

    if (locationChoise == 0) {
      map.src =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1678509.1479966373!2d-93.45054349493151!3d34.74707300888163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d29e3f743f2761%3A0xa405693effdfd2d0!2sArkansas%2C%20USA!5e0!3m2!1sen!2sca!4v1682207678890!5m2!1sen!2sca";
    } else if (locationChoise == 1) {
      map.src =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.2900314679337!2d-93.13672352369504!3d35.298774250887824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87cc53071e379551%3A0xaf9bb3b6b6894e7!2s1950%20N%20Arkansas%20Ave%2C%20Russellville%2C%20AR%2072802%2C%20USA!5e0!3m2!1sen!2sca!4v1682208403839!5m2!1sen!2sca";
    } else if (locationChoise == 2) {
      map.src =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3256.420204794977!2d-93.12349472369507!3d35.29553905106392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87cc53176431dfe5%3A0x9b520ff082c73743!2s2001%20N%20Parker%20Rd%2C%20Russellville%2C%20AR%2072801%2C%20USA!5e0!3m2!1sen!2sca!4v1682208428300!5m2!1sen!2sca";
    } else if (locationChoise == 3) {
      map.src =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.3604400110025!2d-93.1625076236975!3d35.22239645504181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87cc5435ce345943%3A0xec5429b623fa4b3f!2s410%20Union%20St%2C%20Dardanelle%2C%20AR%2072834%2C%20USA!5e0!3m2!1sen!2sca!4v1682208459199!5m2!1sen!2sca";
    }
  });
}

console.log(document.getElementsByClassName("menu-button button"))