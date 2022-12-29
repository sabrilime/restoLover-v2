const CommentForm = ({
    handleSubmit, 
    newComment, 
    setNewComment
}) => (
    <form onSubmit={handleSubmit} >
        <div className="form-group mb-3">
            <h4>Ajouter un commentaire</h4>
            <textarea 
                cols="30" 
                rows="5" 
                className="form-control" 
                value={newComment} 
                onChange={e => setNewComment(e.target.value)} 
            />
        </div>
        <button disabled={!newComment} className="btn btn-primary">Ajouter</button>
    </form>
);

export default CommentForm;