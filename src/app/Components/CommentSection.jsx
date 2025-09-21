"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { useSession, signIn } from "next-auth/react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CommentSection({ blogId }) {
  const { data: session } = useSession();
  const { data: comments, mutate } = useSWR(
    `/api/comments?blogId=${blogId}`,
    fetcher
  );
  const [content, setContent] = useState("");
  const [replyContent, setReplyContent] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!session || !content) return;
    setLoading(true);
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId, content }),
    });
    setContent("");
    mutate();
    setLoading(false);
  };

  const handleReplySubmit = async (commentId) => {
    if (!session || !replyContent[commentId]) return;
    setLoading(true);
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId, reply: replyContent[commentId] }),
    });
    setReplyContent((prev) => ({ ...prev, [commentId]: "" }));
    mutate();
    setLoading(false);
  };

  const handleDelete = async (commentId, replyIndex) => {
    if (!session) return;
    await fetch(
      `/api/comments?commentId=${commentId}${
        replyIndex !== undefined ? `&replyIndex=${replyIndex}` : ""
      }`,
      { method: "DELETE" }
    );
    mutate();
  };

  const handleEdit = async (commentId, replyIndex, oldContent) => {
    if (!session) return;
    const newContent = prompt("Edit your comment/reply:", oldContent);
    if (!newContent) return;
    await fetch("/api/comments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId, replyIndex, content: newContent }),
    });
    mutate();
  };

  return (
    <div className="mt-10 max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
        💬 Comments
      </h3>

      {/* Comment Form */}
      {session ? (
        <form
          onSubmit={handleCommentSubmit}
          className="mb-6 flex flex-col gap-2"
        >
          <textarea
            placeholder="Write a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="p-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="self-end bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold transition"
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <div className="mb-6 flex items-center gap-2 text-gray-700">
          <span>You must be signed in to post comments.</span>
          <button
            onClick={() => signIn()}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            Sign in
          </button>
        </div>
      )}

      {/* Comments List */}
      <div className="flex flex-col gap-4">
        {!comments && <p className="text-gray-500">Loading comments...</p>}
        {comments?.length === 0 && (
          <p className="text-gray-500">No comments yet.</p>
        )}
        {comments?.map((c) => (
          <div
            key={c._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-900 font-semibold">{c.name}</p>
              </div>
            </div>
            <p className="text-gray-800 mt-2">{c.content}</p>

            {/* Replies */}
            <div className="ml-6 mt-3 flex flex-col gap-2">
              {c.replies?.map((r, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 p-3 rounded-lg flex justify-between items-start hover:bg-gray-200 transition"
                >
                  <div>
                    <p className="text-sm text-gray-600">{r.name}</p>
                    <p className="text-gray-800">{r.content}</p>
                  </div>
                </div>
              ))}

              {session && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Reply..."
                    value={replyContent[c._id] || ""}
                    onChange={(e) =>
                      setReplyContent((prev) => ({
                        ...prev,
                        [c._id]: e.target.value,
                      }))
                    }
                    className="flex-1 p-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={() => handleReplySubmit(c._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg transition"
                  >
                    Reply
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
