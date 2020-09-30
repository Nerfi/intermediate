import React from 'react';
import {Card, Button} from 'react-bootstrap';
import './Card.css';
import {Link} from 'react-router-dom';

const CardComponent = ({data}) => {

  return <div className="card__container">

      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={data.imgUrl} />
        <Card.Body>
          <Card.Title className="card__title">{data.title}</Card.Title>
          <Card.Text className="card__content">
            {data.content}
          </Card.Text>
          <Button variant="primary">
            <Link style={{color: 'white'}} to={`/post/${data.id}`} >
            See post
            </Link>
          </Button>
        </Card.Body>
      </Card>
  </div>
};

export default CardComponent;
