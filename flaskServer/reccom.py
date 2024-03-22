from flask import Flask, request, jsonify
from sklearn.metrics.pairwise import cosine_similarity
from transformers import BertTokenizer, BertModel
import torch
from flask_cors import CORS  
app = Flask(__name__)
CORS(app)
def recommend_chat_groups(user_profile, chat_communities, num_recommendations=3):
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    model = BertModel.from_pretrained('bert-base-uncased')
    model.eval()

    user_profile_text = ' '.join(sum(user_profile.values(), []))
    inputs = tokenizer(user_profile_text, return_tensors='pt', max_length=512, truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    user_profile_embedding = torch.mean(outputs.last_hidden_state, dim=1).squeeze().numpy()

    similarities = {}
    for community, topics in chat_communities.items():
        # Check if 'dislikes' key exists in user_profile
        if 'dislikes' in user_profile and community in user_profile['dislikes']:
            continue
        
        related_topics = [topic for topic in topics if topic in user_profile_text]
        if related_topics:
            community_text = ' '.join(related_topics)
            inputs = tokenizer(community_text, return_tensors='pt', max_length=512, truncation=True)
            with torch.no_grad():
                outputs = model(**inputs)
            community_embedding = torch.mean(outputs.last_hidden_state, dim=1).squeeze().numpy()
            similarity_score = cosine_similarity([user_profile_embedding], [community_embedding])[0][0]
            similarities[community] = similarity_score

    sorted_communities = sorted(similarities.items(), key=lambda x: x[1], reverse=True)

    top_recommendations = [community for community, _ in sorted_communities[:num_recommendations]]
    return top_recommendations


@app.route('/recommend_groups', methods=['POST'])
def recommend_groups():
    data = request.get_json()
    print(data)
    user_profile = data['user_profile']
    print(user_profile)
    recommended_groups = recommend_chat_groups(user_profile, chat_communities, num_recommendations=6)
    print(recommended_groups)
    return jsonify({'recommended_groups': recommended_groups})

if __name__ == '__main__':
    chat_communities = {
    'gaming': ['video games', 'console gaming', 'PC gaming', 'mobile gaming', 'board games', 'role-playing games', 'online gaming', 'retro gaming'],
    'sports': ['football', 'basketball', 'soccer', 'baseball', 'tennis', 'golf', 'rugby', 'cricket', 'hockey', 'volleyball'],
    'mental_health': ['anxiety', 'depression', 'therapy', 'stress management', 'self-care', 'mindfulness', 'counseling', 'support groups'],
    'music': ['rock', 'pop', 'hip hop', 'jazz', 'classical', 'country', 'EDM', 'metal', 'indie', 'folk', 'playing guitar', 'singing', 'piano'],
    'movies': ['action', 'comedy', 'drama', 'horror', 'sci-fi', 'romance', 'documentary', 'thriller', 'animation', 'fantasy'],
    'books': ['fiction', 'non-fiction', 'mystery', 'thriller', 'science fiction', 'fantasy', 'biography', 'self-help', 'historical fiction', 'reading', 'writing', 'poetry'],
    'technology': ['programming', 'software development', 'web development', 'artificial intelligence', 'machine learning', 'data science', 'cybersecurity', 'blockchain', 'cloud computing'],
    'cooking': ['recipes', 'baking', 'grilling', 'vegetarian', 'vegan', 'international cuisine', 'healthy eating', 'meal prep', 'cooking', 'baking', 'food photography'],
    'fitness': ['cardio', 'weightlifting', 'yoga', 'pilates', 'crossfit', 'running', 'cycling', 'strength training', 'HIIT workouts', 'playing sports', 'swimming', 'dancing'],
    'travel': ['backpacking', 'solo travel', 'budget travel', 'luxury travel', 'adventure travel', 'cultural tourism', 'road trips', 'ecotourism', 'exploring new places', 'photography', 'hiking']
}
#     user_profile = {
#     'likes': ['fiction', 'cooking', 'fitness'],
#     'dislikes': ['programming', 'mobile games','football'],
#     'hobbies': ['playing guitar', 'reading', 'yoga']
# }
    app.run(debug=True, port=8000)







