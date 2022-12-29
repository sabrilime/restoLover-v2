export const isOwner = (user, creation) => {
    return (user._id && creation.postedBy && user._id === creation.postedBy._id ? true : false);
}