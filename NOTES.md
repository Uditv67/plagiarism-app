| Method      | Precision | Recall | F1 |
|---          |---        |---     |--- |
| TF-IDF only | 0.80      | 0.27   | 0.40 |
| Embeddings only | 0.93  | 0.93   | 0.93 |
| Combined    | 0.93      | 0.93   | 0.93 |

Evaluated on 30 hand-made sentence pairs (15 plagiarized, 15 not).
Thresholds: TF-IDF 0.6, embeddings 0.6.
Limitations: small dataset, ignores word order, heavy paraphrasing can be missed.


DOC A
Climate change is one of the most serious problems facing the world today. Rising global temperatures are melting glaciers and polar ice caps. As a result, sea levels are increasing and threatening coastal cities. Extreme weather events such as floods and droughts are becoming more frequent. Farmers struggle to grow crops when rainfall patterns change unpredictably. Burning fossil fuels releases large amounts of carbon dioxide into the atmosphere. Many countries are investing in solar and wind energy to cut emissions. Individuals can help by using public transport and reducing waste. Cooperation between governments will be essential to slow the damage.

DOC B
Global warming ranks among the gravest challenges humanity faces right now. Increasing worldwide heat is causing glaciers and ice sheets near the poles to melt. Consequently, oceans are climbing higher, putting seaside towns at risk. Severe weather like flooding and prolonged dry spells is occurring more often. Agriculture suffers when the pattern of rain shifts in unexpected ways. Combusting coal, oil and gas pours huge quantities of carbon dioxide into the air. Numerous nations are spending money on sun and wind power to lower pollution. People can contribute by taking buses or trains and producing less rubbish. Teamwork among world leaders will be vital to limit the harm. 

In a fully paraphrased 9-sentence paragraph, 7 of 9 sentences (78%) were detected. The two missed sentences were abstract statements where nearly every word was replaced with a synonym.