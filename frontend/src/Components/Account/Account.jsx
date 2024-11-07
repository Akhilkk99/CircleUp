import React, { useEffect, useState } from 'react';
import './Account.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMyProfile, getMyPosts, logOutUser } from '../../Actions/User';
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import User from '../User/User';

const Account = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { user, loading: usersLoading } = useSelector((state) => state.user);
    const { loading, error, posts } = useSelector((state) => state.myPosts);
    const { error: likeError, message,loading:deleteLoading } = useSelector((state) => state.like);

    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);



    useEffect(() => {
        dispatch(getMyPosts());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: 'clearErrors' });
        }

        if (likeError) {
            alert.error(likeError);
            dispatch({ type: 'clearErrors' });
        }

        if (message) {
            alert.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [alert, error, likeError, message, dispatch]);
    const logoutHandler = () => {
        dispatch(logOutUser())
        alert.success("Logged Out successfully")
    }
    const deleteProfileHandler =async ()=>{
       await dispatch(deleteMyProfile())
        dispatch(logOutUser())
    }

    return loading || usersLoading ? (
        <Loader />
    ) : (
        <div className='account'>
            <div className="accountleft">
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        post && post._id && (
                            <Post
                                key={post._id}
                                postId={post._id}
                                caption={post.caption}
                                postImage={post.image?.url}
                                likes={post.likes}
                                comments={post.comments}
                                ownerImage={post.owner?.avatar?.url}
                                ownerName={post.owner?.name}
                                ownerId={post.owner?._id}
                                isAccount={true}
                                isDelete={true}
                            />
                        )
                    ))
                ) : (
                    <Typography variant="h6">You have not made any posts</Typography>
                )}
            </div>
            <div className="accountright">
                <Avatar
                    src={user.avatar.url}
                    sx={{ height: "8vmax", width: "8vmax" }}
                />
                <Typography variant='h5'>{user.name}</Typography>

                <div>
                    <Button onClick={() => setFollowersToggle(!followersToggle)}>
                        <Typography>Followers</Typography>
                    </Button>
                    <Typography>{user.followers.length}</Typography>
                </div>
                <div>
                    <Button onClick={() => setFollowingToggle(!followingToggle)}>
                        <Typography>Following</Typography>
                    </Button>
                    <Typography>{user.following.length}</Typography>
                </div>
                <div>
                    <Typography>Posts</Typography>
                    <Typography>{user.posts.length}</Typography>
                </div>
                <Button variant="contained" onClick={logoutHandler}>Logout</Button>
                <Link to="/update/profile">Edit Profile</Link>
                <Link to="/update/password">Change Password</Link>
                <Button variant='text' style={{ color: "red", margin: "2vmax" }}
                 onClick={deleteProfileHandler}
                 disabled={deleteLoading}
                 >
                    Delete My Profile
                </Button>

                <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
                    <div className="DialogBox">
                        <Typography variant='h4'>Followers</Typography>
                        {user.followers.length > 0 ? (
                            user.followers.map((follower) => (
                                follower && follower._id && (
                                    <User
                                        key={follower._id}
                                        userId={follower._id}
                                        name={follower.name}
                                        avatar={follower.avatar?.url}
                                    />
                                )
                            ))
                        ) : (
                            <Typography style={{ margin: "2vmax" }}>You have no followers</Typography>
                        )}
                    </div>
                </Dialog>

                <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
                    <div className="DialogBox">
                        <Typography variant='h4'>Following</Typography>
                        {user.following.length > 0 ? (
                            user.following.map((follow) => (
                                follow && follow._id && (
                                    <User
                                        key={follow._id}
                                        userId={follow._id}
                                        name={follow.name}
                                        avatar={follow.avatar?.url}
                                    />
                                )
                            ))
                        ) : (
                            <Typography style={{ margin: "2vmax" }}>You are not following anyone</Typography>
                        )}
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default Account;
