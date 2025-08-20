import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeftIcon, EyeIcon, SaveIcon } from "lucide-react";
import { mockAuthState, mockBlogs } from "@/data/mockData";

export default function CreateBlog() {
  const [isPreview, setIsPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
    coverImage: "",
    tags: ""
  });
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!mockAuthState.isLoggedIn) {
    navigate("/login");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const generateExcerpt = (content: string) => {
    return content.length > 200 ? content.substring(0, 200) + "..." : content;
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const saveDraft = async () => {
    setIsSaving(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newBlog = {
      id: (mockBlogs.length + 1).toString(),
      title: formData.title || "Untitled Draft",
      subtitle: formData.subtitle || undefined,
      content: formData.content,
      excerpt: generateExcerpt(formData.content),
      coverImage: formData.coverImage || undefined,
      authorId: mockAuthState.currentUser!.id,
      published: false,
      featured: false,
      readTime: calculateReadTime(formData.content),
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: formData.tags ? formData.tags.split(",").map(tag => tag.trim()) : undefined
    };

    // Add to mock data (in a real app, this would be an API call)
    mockBlogs.push(newBlog);

    toast({
      title: "Draft saved",
      description: "Your article has been saved as a draft.",
    });
    
    setIsSaving(false);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Missing content",
        description: "Please add a title and content before publishing.",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newBlog = {
      id: (mockBlogs.length + 1).toString(),
      title: formData.title,
      subtitle: formData.subtitle || undefined,
      content: formData.content,
      excerpt: generateExcerpt(formData.content),
      coverImage: formData.coverImage || undefined,
      authorId: mockAuthState.currentUser!.id,
      published: true,
      featured: false,
      readTime: calculateReadTime(formData.content),
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: formData.tags ? formData.tags.split(",").map(tag => tag.trim()) : undefined
    };

    // Add to mock data (in a real app, this would be an API call)
    mockBlogs.push(newBlog);

    toast({
      title: "Article published!",
      description: "Your article has been published successfully.",
    });
    
    navigate(`/blog/${newBlog.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 hover:text-dark-text transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </button>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={saveDraft}
            disabled={isSaving}
            data-testid="button-save-draft"
          >
            <SaveIcon className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Draft"}
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setIsPreview(!isPreview)}
            data-testid="button-toggle-preview"
          >
            <EyeIcon className="w-4 h-4 mr-2" />
            {isPreview ? "Edit" : "Preview"}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-charter font-bold text-dark-text mb-8">Write Your Story</h1>
        
        {!isPreview ? (
          <form onSubmit={handlePublish} className="space-y-6">
            {/* Title Input */}
            <div>
              <Input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="text-3xl font-charter font-bold border-none outline-none shadow-none text-dark-text placeholder:text-gray-400 p-0 focus-visible:ring-0"
                data-testid="input-article-title"
              />
            </div>
            
            {/* Subtitle Input */}
            <div>
              <Input
                name="subtitle"
                placeholder="Subtitle (optional)"
                value={formData.subtitle}
                onChange={handleChange}
                className="text-xl border-none outline-none shadow-none text-gray-text placeholder:text-gray-400 p-0 focus-visible:ring-0"
                data-testid="input-article-subtitle"
              />
            </div>

            {/* Cover Image URL */}
            <div>
              <Input
                name="coverImage"
                placeholder="Cover image URL (optional)"
                value={formData.coverImage}
                onChange={handleChange}
                className="border border-gray-200 focus-visible:ring-2 focus-visible:ring-medium-green"
                data-testid="input-cover-image"
              />
            </div>

            {/* Tags */}
            <div>
              <Input
                name="tags"
                placeholder="Tags (comma separated, optional)"
                value={formData.tags}
                onChange={handleChange}
                className="border border-gray-200 focus-visible:ring-2 focus-visible:ring-medium-green"
                data-testid="input-tags"
              />
            </div>
            
            {/* Content Editor */}
            <div>
              <Textarea
                name="content"
                placeholder="Tell your story..."
                value={formData.content}
                onChange={handleChange}
                className="min-h-96 text-lg border-gray-200 focus-visible:ring-2 focus-visible:ring-medium-green resize-none"
                data-testid="textarea-content"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center justify-end pt-6 border-t border-gray-200">
              <Button 
                type="submit" 
                className="bg-medium-green hover:bg-green-700"
                disabled={isPublishing}
                data-testid="button-publish-article"
              >
                {isPublishing ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="min-h-96">
            <div className="prose prose-lg max-w-none">
              <h1 className="text-3xl font-charter font-bold">{formData.title || "Untitled"}</h1>
              {formData.subtitle && (
                <p className="text-xl text-gray-600 mb-6">{formData.subtitle}</p>
              )}
              {formData.coverImage && (
                <img 
                  src={formData.coverImage} 
                  alt="Cover" 
                  className="w-full h-auto rounded-lg mb-6"
                />
              )}
              {formData.tags && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {formData.tags.split(",").map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
              <div className="whitespace-pre-wrap">{formData.content || "Start writing your story..."}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}