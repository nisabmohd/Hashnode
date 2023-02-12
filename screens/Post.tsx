import {View, Text, Image, ActivityIndicator, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

export default function Post() {
  const [post, setPost] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let body = {
      query: `
      query BlogInfo {
        post(slug:"an-intro-to-solidjs-for-react-developers", hostname: "") {
          title
          dateAdded
          coverImage
          author {
            name
            photo
          }
          tags {
            name
            _id
          }
          contentMarkdown
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
        setPost(response.data.data.post);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Image
            style={{width: '100%', height: 180}}
            source={{uri: post.coverImage}}
          />
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 28,
              marginTop: 18,
            }}>
            {post.title}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              marginTop: 25,
            }}>
            <Image
              style={{width: 44, height: 44, borderRadius: 50}}
              source={{uri: post.author.photo}}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Text style={{fontSize: 19}}>{post.author.name}</Text>
              <Text>{timeAgo.format(Date.parse(post.dateAdded))}</Text>
            </View>
          </View>
          {/* <Text style={{width: '94%', marginLeft: 'auto', marginRight: 'auto'}}>
            {post.contentMarkdown}
          </Text> */}
        </View>
      )}
    </ScrollView>
  );
}
