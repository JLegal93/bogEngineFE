using Blog.Engine.Base;
using System.Configuration;
using System.Net.Http.Headers;

namespace BlogEngine.Models
{
    public static class BlogEngineServiceClient
    {
        static HttpClient client = new HttpClient();
        static IConfigurationRoot AppSetting = new ConfigurationBuilder()
                                                   .SetBasePath(Directory.GetCurrentDirectory())
                                                   .AddJsonFile("appsettings.json")
                                                   .Build();

        public static async Task<PostsData> Get  ()
      {
            var data = new PostsData();


            var path = AppSetting.GetSection("blogEngineSVC").Value + "api/BlogEngine/Get";

    
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.GetAsync(path);

            if (response.IsSuccessStatusCode)
            {
                data = await response.Content.ReadFromJsonAsync<PostsData>();

            }

            return data;
      }
    }
}
