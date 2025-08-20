import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertArticleSchema, type InsertArticle } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "@/components/rich-text-editor";

export default function Write() {
  const [isPreview, setIsPreview] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertArticle>({
    resolver: zodResolver(insertArticleSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      content: "",
      excerpt: "",
      coverImage: "",
      authorId: "1", // Mock author ID - in real app this would come from auth
      published: false,
      featured: false,
      readTime: "5 min read",
    },
  });

  const createArticleMutation = useMutation({
    mutationFn: async (data: InsertArticle) => {
      const response = await apiRequest("POST", "/api/articles", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Article created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create article. Please try again.",
        variant: "destructive",
      });
    },
  });

  const saveDraftMutation = useMutation({
    mutationFn: async (data: InsertArticle) => {
      const response = await apiRequest("POST", "/api/articles", { ...data, published: false });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Draft saved",
        description: "Your article has been saved as a draft.",
      });
    },
  });

  const onSubmit = (data: InsertArticle) => {
    // Generate excerpt from content if not provided
    if (!data.excerpt && data.content) {
      data.excerpt = data.content.substring(0, 200) + "...";
    }
    
    createArticleMutation.mutate({ ...data, published: true });
  };

  const saveDraft = () => {
    const data = form.getValues();
    if (!data.excerpt && data.content) {
      data.excerpt = data.content.substring(0, 200) + "...";
    }
    saveDraftMutation.mutate({ ...data, published: false });
  };

  const watchedValues = form.watch();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-charter font-bold text-dark-text mb-8">Write Your Story</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Input */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Title"
                      className="text-3xl font-charter font-bold border-none outline-none shadow-none text-dark-text placeholder:text-gray-400 p-0 focus-visible:ring-0"
                      data-testid="input-article-title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Subtitle Input */}
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Subtitle (optional)"
                      className="text-xl border-none outline-none shadow-none text-gray-text placeholder:text-gray-400 p-0 focus-visible:ring-0"
                      data-testid="input-article-subtitle"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cover Image URL */}
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Cover image URL (optional)"
                      className="border border-gray-200 focus-visible:ring-2 focus-visible:ring-medium-green"
                      data-testid="input-cover-image"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Content Editor */}
            {!isPreview ? (
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-4">
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Tell your story..."
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className="min-h-96 p-6 border border-gray-200 rounded-lg">
                <h2 className="text-2xl font-charter font-bold mb-4">Preview</h2>
                <div className="prose prose-lg max-w-none">
                  <h1 className="text-3xl font-charter font-bold">{watchedValues.title}</h1>
                  {watchedValues.subtitle && (
                    <p className="text-xl text-gray-600 mb-6">{watchedValues.subtitle}</p>
                  )}
                  {watchedValues.coverImage && (
                    <img 
                      src={watchedValues.coverImage} 
                      alt="Cover" 
                      className="w-full h-auto rounded-lg mb-6"
                    />
                  )}
                  <div className="whitespace-pre-wrap">{watchedValues.content}</div>
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={saveDraft}
                  disabled={saveDraftMutation.isPending}
                  data-testid="button-save-draft"
                >
                  <i className="fas fa-save mr-2"></i>
                  {saveDraftMutation.isPending ? "Saving..." : "Save Draft"}
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setIsPreview(!isPreview)}
                  data-testid="button-toggle-preview"
                >
                  <i className="fas fa-eye mr-2"></i>
                  {isPreview ? "Edit" : "Preview"}
                </Button>
              </div>
              <Button 
                type="submit" 
                className="bg-medium-green hover:bg-green-700"
                disabled={createArticleMutation.isPending}
                data-testid="button-publish-article"
              >
                {createArticleMutation.isPending ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
