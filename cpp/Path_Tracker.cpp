#include <iostream>
#include <unordered_map>
#include <vector>
#include <queue>
#include <limits>
#include <string>

using namespace std;

class Graph_M {
public:
    class Vertex {
    public:
        unordered_map<string, int> nbrs;
    };

    unordered_map<string, Vertex> vtces;

    Graph_M() {}

    int numVertices() {
        return vtces.size();
    }

    bool containsVertex(const string& vname) {
        return vtces.count(vname) > 0;
    }

    void addVertex(const string& vname) {
        Vertex vtx;
        vtces[vname] = vtx;
    }

    void removeVertex(const string& vname) {
        Vertex vtx = vtces[vname];
        vector<string> keys;
        for (auto& entry : vtx.nbrs) {
            keys.push_back(entry.first);
        }

        for (const string& key : keys) {
            Vertex& nbrVtx = vtces[key];
            nbrVtx.nbrs.erase(vname);
        }

        vtces.erase(vname);
    }

    int numEdges() {
        int count = 0;
        for (auto& entry : vtces) {
            const Vertex& vtx = entry.second;
            count += vtx.nbrs.size();
        }
        return count / 2;
    }

    bool containsEdge(const string& vname1, const string& vname2) {
        if (vtces.find(vname1) == vtces.end()) return false;
        const Vertex& vtx1 = vtces.at(vname1);
        return vtx1.nbrs.count(vname2) > 0;
    }

    void addEdge(const string& vname1, const string& vname2, int value) {
        if (!containsEdge(vname1, vname2)) {
            vtces[vname1].nbrs[vname2] = value;
            vtces[vname2].nbrs[vname1] = value;
        }
    }

    void removeEdge(const string& vname1, const string& vname2) {
        if (containsEdge(vname1, vname2)) {
            vtces[vname1].nbrs.erase(vname2);
            vtces[vname2].nbrs.erase(vname1);
        }
    }

    void display_Map() {
        cout << "\t Delhi Metro Map" << endl;
        cout << "\t------------------" << endl;
        cout << "----------------------------------------------------" << endl << endl;
        for (auto& entry : vtces) {
            const string& key = entry.first;
            const Vertex& vtx = entry.second;
            cout << key << " =>" << endl;
            for (auto& nbr : vtx.nbrs) {
                cout << "\t" << nbr.first << "\t";
                if (nbr.first.length() < 16)
                    cout << "\t";
                if (nbr.first.length() < 8)
                    cout << "\t";
                cout << nbr.second << " KM" << endl;
            }
            cout << endl;
        }
        cout << "\t------------------" << endl;
        cout << "---------------------------------------------------" << endl << endl;
    }

    void display_Stations() {
        cout << endl << "***********************************************************************" << endl << endl;
        int i = 1;
        for (auto& entry : vtces) {
            const string& key = entry.first;
            cout << i << ". " << key << endl;
            i++;
        }
        cout << endl << "***********************************************************************" << endl << endl;
    }

    bool hasPath(const string& vname1, const string& vname2, unordered_map<string, bool>& visited) {
        visited[vname1] = true;

        if (containsEdge(vname1, vname2))
            return true;

        for (auto& nbr : vtces[vname1].nbrs) {
            if (!visited[nbr.first] && hasPath(nbr.first, vname2, visited))
                return true;
        }

        return false;
    }

    void shortestPath(const string& vname1, const string& vname2) {
        unordered_map<string, int> dist;
        unordered_map<string, string> parent;

        for (auto& entry : vtces) {
            dist[entry.first] = numeric_limits<int>::max();
        }

        priority_queue<pair<int, string>, vector<pair<int, string>>, greater<pair<int, string>>> pq;
        dist[vname1] = 0;
        parent[vname1] = "";
        pq.push({0, vname1});

        while (!pq.empty()) {
            auto top = pq.top();
            pq.pop();
            int currentDist = top.first;
            string u = top.second;

            if (currentDist > dist[u]) continue;
            if (u == vname2) break;

            for (auto& nbr : vtces[u].nbrs) {
                string v = nbr.first;
                int weight = nbr.second;
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    parent[v] = u;
                    pq.push({dist[v], v});
                }
            }
        }

        vector<string> path;
        string curr = vname2;
        while (curr != "") {
            path.push_back(curr);
            curr = parent[curr];
        }

        if (path.size() == 1 && path[0] != vname1) {
            cout << "No path exists between " << vname1 << " and " << vname2 << endl;
        } else {
            cout << "Shortest path from " << vname1 << " to " << vname2 << ":" << endl;
            for (int i = path.size() - 1; i >= 0; i--) {
                cout << path[i];
                if (i > 0) cout << " -> ";
            }
            cout << endl;
            cout << "Total Distance: " << dist[vname2] << " KM" << endl;
        }
    }
};

int main() {
    Graph_M g;
    g.addVertex("New Delhi");
    g.addVertex("Chandni Chowk");
    g.addVertex("Lal Quila");
    g.addVertex("Connaught Place");
    g.addVertex("Karol Bagh");
    g.addVertex("Dwarka");
    g.addVertex("Hauz Khas");
    g.addVertex("Punjabi Bagh");
    g.addVertex("Rajouri Garden");
    g.addVertex("Rohini");
    g.addVertex("Dilshad Garden");
    g.addVertex("Gurugram");
    g.addVertex("Noida");
    g.addVertex("Vaishali");
    g.addVertex("Kashmere Gate");
    g.addVertex("Central Secretariat");
    g.addVertex("AIIMS");
    g.addVertex("Saket");
    g.addVertex("Mandi House");
    g.addVertex("Janakpuri West");
    g.addVertex("Botanical Garden");
    g.addVertex("Kalkaji Mandir");
    g.addVertex("Netaji Subhash Place");
    g.addVertex("Anand Vihar ISBT");
    g.addVertex("IGI Airport");

    g.addEdge("New Delhi", "Chandni Chowk", 5);
    g.addEdge("New Delhi", "Lal Quila", 3);
    g.addEdge("New Delhi", "Connaught Place", 2);
    g.addEdge("Connaught Place", "Karol Bagh", 4);
    g.addEdge("Connaught Place", "Hauz Khas", 7);
    g.addEdge("Connaught Place", "Punjabi Bagh", 5);
    g.addEdge("Karol Bagh", "Rajouri Garden", 2);
    g.addEdge("Karol Bagh", "Rohini", 9);
    g.addEdge("Hauz Khas", "Rohini", 6);
    g.addEdge("Hauz Khas", "Dwarka", 8);
    g.addEdge("Rohini", "Dilshad Garden", 8);
    g.addEdge("Rohini", "Gurugram", 7);
    g.addEdge("Rohini", "Noida", 9);
    g.addEdge("Dwarka", "Gurugram", 3);
    g.addEdge("Dwarka", "Noida", 6);
    g.addEdge("Gurugram", "Noida", 2);
    g.addEdge("Noida", "Vaishali", 3);

    g.addEdge("Kashmere Gate", "Chandni Chowk", 2);
    g.addEdge("Kashmere Gate", "Netaji Subhash Place", 6);
    g.addEdge("Kashmere Gate", "Dilshad Garden", 9);
    g.addEdge("Netaji Subhash Place", "Rohini", 5);
    g.addEdge("Netaji Subhash Place", "Punjabi Bagh", 4);
    g.addEdge("Punjabi Bagh", "Rajouri Garden", 4);
    g.addEdge("Rajouri Garden", "Janakpuri West", 5);
    g.addEdge("Janakpuri West", "Dwarka", 6);
    g.addEdge("Dwarka", "IGI Airport", 4);
    g.addEdge("New Delhi", "IGI Airport", 19);
    g.addEdge("Connaught Place", "Central Secretariat", 3);
    g.addEdge("Connaught Place", "Mandi House", 2);
    g.addEdge("Mandi House", "Lal Quila", 4);
    g.addEdge("Mandi House", "Anand Vihar ISBT", 8);
    g.addEdge("Anand Vihar ISBT", "Vaishali", 3);
    g.addEdge("Central Secretariat", "AIIMS", 4);
    g.addEdge("AIIMS", "Hauz Khas", 4);
    g.addEdge("Hauz Khas", "Saket", 3);
    g.addEdge("Saket", "Gurugram", 12);
    g.addEdge("Hauz Khas", "Kalkaji Mandir", 6);
    g.addEdge("Kalkaji Mandir", "Botanical Garden", 7);
    g.addEdge("Botanical Garden", "Noida", 4);

    g.display_Map();
    g.display_Stations();

    string source, destination;

    cout << "Enter source station: ";
    getline(cin >> ws, source);
    cout << "Enter destination station: ";
    getline(cin >> ws, destination);

    cout << "Source: " << source << endl;
    cout << "Destination: " << destination << endl;
    cout << endl;

    unordered_map<string, bool> mp;
    if (g.containsVertex(source) && g.containsVertex(destination)) {
        if (g.hasPath(source, destination, mp)) {
            g.shortestPath(source, destination);
        } else {
            cout << "No path exists between " << source << " and " << destination << endl;
        }
    } else {
        cout << "Source or destination not found!" << endl;
    }

    return 0;
}
