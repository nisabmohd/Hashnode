import {ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Post from '../components/Post';
import axios from 'axios';

export default function Home(): JSX.Element {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    let body = {
      query: `
      query{
        storiesFeed(type:BEST,page:1){
        _id
        author{
          username
          photo
        }
        contentMarkdown
        slug
        title
        coverImage
        totalReactions
        brief
        dateAdded
      }
    }
            `,
    };
    let options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .post('https://api.hashnode.com/', body, options)
      .then(response => {
        console.log(response.data.data);
        setPosts(response.data.data.storiesFeed);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <ScrollView style={{paddingBottom: 45, height: '100%'}}>
      {posts!.map(item => (
        <Post
          key={item._id}
          username={item.author.username}
          image={item.author.photo}
          breif={item.brief}
          title={item.title}
          timestamp={item.dateAdded}
        />
      ))}
    </ScrollView>
  );
}
