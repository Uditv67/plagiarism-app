| Method      | Precision | Recall | F1 |
|---          |---        |---     |--- |
| TF-IDF only | 0.80      | 0.27   | 0.40 |
| Embeddings only | 0.93  | 0.93   | 0.93 |
| Combined    | 0.93      | 0.93   | 0.93 |

Evaluated on 30 hand-made sentence pairs (15 plagiarized, 15 not).
Thresholds: TF-IDF 0.6, embeddings 0.6.
Limitations: small dataset, ignores word order, heavy paraphrasing can be missed.