<div id="top"></div>
<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/metakgp/travel-buddy">
    <img src="https://raw.githubusercontent.com/metakgp/design/main/logos/black-large.jpg" alt="Logo" width="140">
  </a>

  <h3 align="center">Travel Buddy</h3>

  <p align="center">
    <i>Helping IIT KGP students find travel partners for their trips</i>
    <br />
    <!-- <a href="#getting-started"><strong>Explore the docs »</strong></a>
    <br /> -->
    <a href="https://github.com/metakgp/travel-buddy/issues">Report Bug</a>
    ·
    <a href="https://github.com/metakgp/travel-buddy/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
	<li><a href="#maintainers">Maintainer(s)</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Travel Buddy is a NextJS 14 and MongoDB Atlas-based web application designed to help IIT KGP students find travel partners for various trips. Whether it's sharing a cab to the airport, finding a train buddy, or coordinating travel plans, Travel Buddy makes it easier to connect with fellow travelers.

### Features

-   **Trip Matching:** Enter your trip details and find others with similar plans within a +/-3 hour window.
-   **Train Matching:** Enter your train details to find other travelers on the same train and date.
-   **High Usability:** Easy-to-use interface designed specifically for IIT KGP students.
-   **Authentication:** Secure login and registration using Institure Email Address using [heimdall](https://github.com/metakgp/heimdall/).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- INSTALLATION -->

## Installation

To set up Travel Buddy locally, follow these steps:

### Prerequisites

-   Ensure you have Node.js and npm installed. You can download them from [here](https://nodejs.org/).
-   MongoDB Atlas account and cluster. Sign up [here](https://www.mongodb.com/cloud/atlas).

### Steps

1. Clone the repository:
    ```sh
    git clone https://github.com/metakgp/travel-buddy.git
    cd travel-buddy
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Configure environment variables:

    - Create a `.env` file in the root directory.
    - Copy the content from `.env.example` to `.env`:

         ```bash
           cp .env.example .env
        ```

        ```env
        MONGODB_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key
        HASH_SECRET=your_HmacSHA256_secret_key
        SYSTEM_MAIL=your_email_address
        SYSTEM_MAIL_PASS=your_email_address_password
        ```
    - Replace placeholder values in the .env file with actual values.

4. Run the application:
    ```sh
    npm run dev
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE -->

## Usage

To use Travel Buddy, follow these steps:

1. Open the application in your browser:

    ```sh
    http://localhost:3000
    ```

2. Register or log in using your Institute Email Address.
3. Enter your trip or train details to find matching travelers.
4. Browse through the list of potential travel partners and connect with them.

### Matching Logic

-   **Trip Matching:** Finds other travelers with trip times within +/- 3 hours of your specified time.
-   **Train Matching:** Matches travelers based on the train number and departure date.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### Steps to Contribute

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Setup

-   Ensure your development environment is set up with Node.js, npm, and MongoDB Atlas.
-   Refer to the [Installation](#installation) section for initial setup instructions.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

-   [ ] UI and Quality of Life (QOL) improvements.
-   [ ] Enhance train matching logic to include nearby arrival/departure timings at the same station.
-   [ ] Adapt the application for use by other colleges.

See the [open issues](https://github.com/saharsh-agrawal/Minesweeper/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Maintainer(s)

-   [Saharsh Agrawal](https://github.com/saharsh-agrawal)

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

<p>
📫 Metakgp -
<a href="https://bit.ly/metakgp-slack">
  <img align="center" alt="Metakgp's slack invite" width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/slack.svg" />
</a>
<a href="mailto:metakgp@gmail.com">
  <img align="center" alt="Metakgp's email " width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/gmail.svg" />
</a>
<a href="https://www.facebook.com/metakgp">
  <img align="center" alt="metakgp's Facebook" width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/facebook.svg" />
</a>
<a href="https://www.linkedin.com/company/metakgp-org/">
  <img align="center" alt="metakgp's LinkedIn" width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/linkedin.svg" />
</a>
<a href="https://twitter.com/metakgp">
  <img align="center" alt="metakgp's Twitter " width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/twitter.svg" />
</a>
<a href="https://www.instagram.com/metakgp_/">
  <img align="center" alt="metakgp's Instagram" width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/instagram.svg" />
</a>
</p>

<p align="right">(<a href="#top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/metakgp/travel-buddy.svg?style=for-the-badge
[contributors-url]: https://github.com/metakgp/travel-buddy/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/metakgp/travel-buddy.svg?style=for-the-badge
[forks-url]: https://github.com/metakgp/travel-buddy/network/members
[stars-shield]: https://img.shields.io/github/stars/metakgp/travel-buddy.svg?style=for-the-badge
[stars-url]: https://github.com/metakgp/travel-buddy/stargazers
[issues-shield]: https://img.shields.io/github/issues/metakgp/travel-buddy.svg?style=for-the-badge
[issues-url]: https://github.com/metakgp/travel-buddy/issues
