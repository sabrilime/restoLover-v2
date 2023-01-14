import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isOwner } from "../../hooks/owner";
import Comment from '../../components/Comment';
import ConnectNav from "../../components/menu/ConnectNav";
import BigCard from "../../components/cards/BigCard";
import CommentForm from "../../components/forms/CommentForm";
import { read } from "../../actions/restaurant";
import { commentsByRestaurant, addCommentToRestaurant } from "../../actions/comment";
import { 
    isRestaurantFavourite, 
    addRestaurantFavourite, 
    removeRestaurantFavourite 
} from "../../actions/favourite";

const ViewRestaurant = (props) => {
    const {auth} = useSelector((state) => ({ ...state }));
    const {user, token } = auth;

    let { restaurantId } = useParams();

    const [restaurant, setRestaurant] = useState({});
    const [restaurantImage, setRestaurantImage] = useState("");
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [owner, setOwner] = useState(false);
    const [favourite, setFavourite] = useState(false);

    useEffect(() => {
        loadRestaurant();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        loadComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        isFavourite();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadRestaurant = async() => {
        let res = await read(token, restaurantId);
        setRestaurant(res.data);
        setRestaurantImage(`${process.env.REACT_APP_API}/restaurant/image/${restaurantId}`);

        isOwnerFct(user, res.data);
    };

    const isOwnerFct = async(user, restaurant) => {
        let res = isOwner(user, restaurant);
        setOwner(res);
    };

    const loadComments = async() => {
        let res = await commentsByRestaurant(token, restaurantId);
        setComments(res.data);
    };

    const isFavourite = async() => {
        let res = await isRestaurantFavourite(token, restaurantId);
        (res.data && res.data.ok && setFavourite(res.data.ok));
    }

    const handleChange = async() => {
        favourite ? 
            removeFromFavourite() : 
            addToFavourite()
    }

    const addToFavourite = async() => {
        try{
            await addRestaurantFavourite(
                token,
                {
                user: user._id, restaurant: restaurantId
            });
            setFavourite(true);
            toast.success('Restaurant ajouté aux favoris.');
        } catch (err) {
            console.log(err);
            if(err.response.status === 400) toast.error(err.response.data);
        }
    }

    const removeFromFavourite = async() => {
        try{
            await removeRestaurantFavourite(
                token,
                {
                user: user._id, restaurant: restaurantId
            });
            setFavourite(false);
            toast.success('Restaurant enlevé des favoris.');
        } catch (err) {
            console.log(err);
            if(err.response.status === 400) toast.error(err.response.data);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await addCommentToRestaurant(
                token, 
                restaurantId, 
                {content: newComment, postedBy: user._id}
            );
            loadComments();
            toast.success('Commentaire ajouté avec succès.');
        } catch (err) {
            console.log(err);
            if(err.response.status === 400) toast.error(err.response.data);
        }
    };
    
    return (
        <>
            <div className="container-fluid bg-secondary p-4">
                <ConnectNav />
            </div>

            <div className="text-center">
                <h2>{restaurant.title}</h2>
            </div>

            <div className="container-fluid">
                
                <BigCard 
                    creation={restaurant} 
                    name="restaurant" 
                    image={restaurantImage}
                    owner={owner}
                    favourite={favourite}
                    handleChange={handleChange}
                />
                    
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5 col-md-6 col-12 pb-4">
                            <h1>Commentaires</h1>
                            {comments && comments.map(comment => 
                                <Comment 
                                    key={comment._id} 
                                    firstName={comment.postedBy.firstName}
                                    lastName={comment.postedBy.lastName}
                                    content={comment.content}
                                    date={comment.createdAt}
                                />
                            )}
                        </div>
                        <div className="col-lg-4 col-md-5 col-sm-4 offset-md-1 offset-sm-1 col-12 mt-4">
                            <CommentForm 
                                handleSubmit={handleSubmit}
                                newComment={newComment}
                                setNewComment={setNewComment}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ViewRestaurant;