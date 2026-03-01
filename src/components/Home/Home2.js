import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I’m Mohamed, a tech-driven problem solver with a strong interest in software development, data, and building practical solutions. I enjoy turning ideas into working projects and continuously improving my technical skills through hands-on experience.
              <br />
              <br />
              My interests span
              <i>
                <b className="purple">
                  {" "}
                  programming, data analysis, and software engineering, {" "}
                </b>
              </i>
              and I’m particularly motivated by projects where I can learn something new and see a real result. Alongside tech
              <br />
              <br />
              I work with
              <i>
                <b className="purple">
                  {" "}
                  SQL databases and data warehousing, {" "}
                </b>
              </i>
              building ETL pipelines to extract, transform, and load data efficiently. I also develop backend solutions using Flask to create APIs and applications that connect seamlessly with databases.
              <br />
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
