"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Download } from "lucide-react";

export default function InstagramDownloader() {
  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState("high");
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const { toast } = useToast();

  const handleDownload = async () => {
    console.log("handleDownload called");
    setLoading(true);
    try {
      console.log("Sending request to /api/download");
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, quality }),
      });

      console.log("Response received:", response.status);

      if (!response.ok) {
        throw new Error("Failed to fetch video data");
      }

      const data = await response.json();
      console.log("Data received:", data);
      setVideoData(data);
      toast({
        title: "Success",
        description: "Video data fetched successfully!",
      });
    } catch (err) {
      console.error("Error in handleDownload:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Instagram Video Downloader
          </CardTitle>
          <CardDescription className="text-center">
            Enter the URL of the Instagram video you want to download
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Instagram Video URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Select onValueChange={(value) => setQuality(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High Quality</SelectItem>
                <SelectItem value="low">Low Quality</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleDownload}
            disabled={loading || !url}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            {loading ? "Processing..." : "Download Video"}
          </Button>
        </CardFooter>
      </Card>

      {videoData && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Video Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <video
              controls
              className="w-full rounded-lg shadow-lg"
              poster={videoData.thumbnail || ""}
            >
              <source src={videoData.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Button
              className="w-full mt-4"
              onClick={() => window.open(videoData.url, "_blank")}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Video
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
