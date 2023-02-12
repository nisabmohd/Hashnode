import {ActivityIndicator, Button, ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Post from '../components/Postcard';
import axios from 'axios';

export default function Home(): JSX.Element {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let body = {
      query: `
      {
        storiesFeed(type: FEATURED, page: ${page}) {
          _id
          slug
          author {
            name
            photo
          }
          brief
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
        if (response.data.data.storiesFeed)
          setPosts(prev => [...prev, ...response.data.data.storiesFeed]);
        else setDone(true);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  function handlepagechange() {
    setLoading(true);
    setPage(prev => prev + 1);
  }
  return (
    <ScrollView style={{paddingBottom: 45, height: '100%'}}>
      {posts!.map(item => (
        <Post
          key={item._id}
          username={item.author.username}
          image={
            item.author.photo ??
            `https://api.dicebear.com/5.x/initials/svg?seed=${item.author.username}`
          }
          breif={item.brief}
          title={item.title}
          timestamp={item.dateAdded}
        />
      ))}
      {!done && (
        <View style={{marginTop: 15}}>
          {!loading ? (
            <Button onPress={handlepagechange} title="Load More" />
          ) : (
            <ActivityIndicator style={{marginBottom: 8}} />
          )}
        </View>
      )}
    </ScrollView>
  );
}
