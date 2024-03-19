import json
def populate():

    with open('data.json') as f:
        # Load the JSON data into a Python dictionary
        data = json.load(f)
    


    songs_list = []

    for id,title,danceability,energy,key,loudness,mode,acousticness,instrumentalness,liveness,valence,tempo,duration_ms,time_signature,num_bars,num_sections,num_segments,class_field,rating in zip(data["id"].values(),data["title"].values(),data["danceability"].values(),data["energy"].values(),data["key"].values(),data["loudness"].values(),data["mode"].values(),data["acousticness"].values(),data["instrumentalness"].values(),data["liveness"].values(),data["valence"].values(),data["tempo"].values(),data["duration_ms"].values(),data["time_signature"].values(),data["num_bars"].values(),data["num_sections"].values(),data["num_segments"].values(),data["class"].values(),[0]*len(data["id"].values())):
        song_dict = {
            "id":id,
            "title":title,
            "danceability":danceability,
            "energy":energy,
            "key":key,
            "loudness":loudness,
            "mode":mode,
            "acousticness":acousticness,
            "instrumentalness":instrumentalness,
            "liveness":liveness,
            "valence":valence,
            "tempo":tempo,
            "duration_ms":duration_ms,
            "time_signature":time_signature,
            "num_bars":num_bars,
            "num_sections":num_sections,
            "num_segments":num_segments,
            "class_field":class_field,
            "rating":0
        }
        songs_list.append(song_dict)
        
    print("songs_list",songs_list)
   
    
        
    

        
    
    

populate()