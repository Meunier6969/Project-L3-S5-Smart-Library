<template>
  <div>
    <!-- Floating Button to trigger chatbox modal -->
    <button type="button" class="btn btn-secondary chatbox-floating-btn" @click="openChatboxModal">
      <i class="bi bi-robot icon"></i>
    </button>

    <!-- Chatbox Modal -->
    <div class="modal fade" id="chatboxModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header text-center align-items-center">
            <i class="bi bi-robot icon"></i>
            <h4 class="modal-title w-100">Smart Librarian</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <div class="chatbox-body"><!-- Chat history -->
              <div class="chat-history mt-3" v-for="(message, index) in messages.slice(1)" :key="index">
                <p><strong v-if="message.role === 'user'">You:</strong><strong v-else-if="message.role === 'assistant'">AI:</strong><strong v-else>System:</strong> {{ message.content }}</p>
              </div>
            </div>
            <!-- Message Input -->
            <textarea v-model="userMessage" class="form-control mt-3" rows="3" placeholder="Type your message here..."></textarea>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="sendMessage">Send Message</button>
            <button type="button" class="btn btn-danger" @click="clear">Clear History</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {nextTick, ref} from 'vue';
import axios from 'axios';

// Chatbox data
const systemPrompt = {role: 'system', content: "Recommend books from a specified list based on user preferences and gently inform users when a book they seek is not available.\n" +
      "\n" +
      "Ensure that recommendations are exclusively from the provided book list: L'art de la guerre, Fahrenheit 451, 1984, To Kill a Mockingbird, The Great Gatsby, Brave New World, The Catcher in the Rye, Moby Dick, Pride and Prejudice, The Hobbit, The Diary of a Young Girl, War and Peace, The Alchemist, The Picture of Dorian Gray, The Odyssey, Wuthering Heights, The Brothers Karamazov, Crime and Punishment, The Grapes of Wrath, Catch-22, The Road, A Tale of Two Cities, The Chronicles of Narnia, The Little Prince, The Fault in Our Stars, The Kite Runner, The Hunger Games, Life of Pi, The Shining, The Color Purple, The Perks of Being a Wallflower, One Hundred Years of Solitude, The Handmaid's Tale, Slaughterhouse-Five, Beloved, The Hitchhiker's Guide to the Galaxy, The Lord of the Rings, Gone Girl, Dune, The Da Vinci Code.\n" +
      "\n" +
      "# Steps\n" +
      "\n" +
      "1. **Inquire about Preferences:** Ask the user about the genre or type of book they are interested in.\n" +
      "2. **Cross-check Book List:** Align user preferences with the available list to find suitable recommendations.\n" +
      "3. **Provide Recommendations:** Offer 1-3 book suggestions from the list that match the user's interests. Describe what the books are about.\n" +
      "4. **Unavailable Requests:** If a user inquires about a book not on the list, inform them it isn't available on Smart Library.\n" +
      "\n" +
      "# Output Format\n" +
      "\n" +
      "- Recommendations: Provide a brief description of suggested books, highlighting why they might suit the user's preferences.\n" +
      "- Unavailable Book Notification: Politely inform the user with a short sentence that the requested book is not available.\n" +
      "\n" +
      "# Examples\n" +
      "\n" +
      "**Example 1:**\n" +
      "\n" +
      "_Input:_ \"I'm looking for a classic novel with complex characters.\"\n" +
      "_Output:_ \"I recommend 'Pride and Prejudice' for its rich character development and timeless social critique, or 'Wuthering Heights' for its dark and intricate storytelling dynamics.\"\n" +
      "\n" +
      "**Example 2:**\n" +
      "\n" +
      "_Input:_ \"Do you have 'The Book Thief'?\"\n" +
      "_Output:_ \"Unfortunately, 'The Book Thief' is not available on our website Smart Library. Can I recommend another book?\""}
const userMessage = ref("");
const messages = ref([systemPrompt, {role: 'assistant', content: 'Hello! How can I assist you today? Are you looking for book recommendations or help with something else?'}]);

// Open modal
function openChatboxModal() {
  $('#chatboxModal').modal('show');
}

function scrollToBottom() {
  const chatHistory = document.querySelector('.chatbox-body');
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function clear() {
  messages.value = [systemPrompt];
}

// Send message to OpenAI API and include the entire conversation history
async function sendMessage() {
  if (!userMessage.value.trim()) return;

  // Append the user message to the chat
  messages.value.push({ role: 'user', content: userMessage.value });

  console.log(import.meta.env.VITE_API_KEY)
  try {
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: messages.value,  // Send the conversation history including the system prompt
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
    );

    // Append the AI response to the chat
    messages.value.push({ role: 'assistant', content: response.data.choices[0].message.content });

    await nextTick();
    scrollToBottom();
  } catch (error) {
    console.error("Error communicating with OpenAI API:", error);
  }

  // Clear input field
  userMessage.value = "";
}
</script>

<style scoped>
.chatbox-floating-btn {
  position: fixed;
  bottom: 20px;
  left: 20px;
  border-radius: 50px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.icon {
  font-size: 1.5rem;
}

.chatbox-body {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-height: 300px;
  background-color: #f8f9fa;
  max-height: 300px;
  overflow-y: auto;
}

.chat-history {
  margin-bottom: 10px;
}
</style>