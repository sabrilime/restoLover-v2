import Moment from 'react-moment';
import { Avatar } from 'antd';

const Comment = ({ firstName, lastName, content, date }) => { 
    return (
      <>
        <div className="comment mt-4 text-justify float-left">
              {/*<img src="https://i.imgur.com/yTFUilP.jpg" alt="" className="rounded-circle" width="40" height="40" />*/}
              <Avatar>{firstName[0]}</Avatar>
              <h4>{firstName+" "+lastName}</h4>
              <span>
                <Moment format="DD-MM-YYYY HH:mm">
                  {date}
                </Moment>
              </span>
              <br />
              <p>{content}</p>
        </div>
      </>
    )};

export default Comment;