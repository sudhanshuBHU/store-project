'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface Post {
  _id: string;
  title: string;
  content: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setPosts(posts.filter((post) => post._id !== id));
  };

  if (loading) return <div>Loading...</div>;
  if (!posts.length) return <div>No posts found.</div>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div key={post._id} className="bg-white rounded shadow p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.content.slice(0, 100)}{post.content.length > 100 ? '...' : ''}</p>
          </div>
          <div className="flex gap-2 mt-4">
            <Link href={`/post/${post._id}`}><Button className="bg-yellow-500 hover:bg-yellow-600">View</Button></Link>
            <Link href={`/edit-post/${post._id}`}><Button className="bg-orange-500 hover:bg-orange-600">Edit</Button></Link>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleDelete(post._id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList; 