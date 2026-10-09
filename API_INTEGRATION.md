# API Integration Guide

This document explains how to integrate the Blinkit Chatbot Frontend with backend services.

## 🔌 Backend Architecture Overview

```
Frontend (HTML/CSS/JS)
    ↓
API Gateway (REST/GraphQL)
    ↓
├── Chat Service (Message Processing)
├── RAG Pipeline (Vector Search + LLM)
├── Order Service (Order Data)
├── Refund Service (Payment Processing)
└── Analytics Service (Monitoring)
    ↓
├── Vector Database (Pinecone/Milvus/ChromaDB)
├── LLM Provider (OpenAI/Google/Open Source)
├── Order Database (PostgreSQL/MongoDB)
└── Cache (Redis)
```

## 📡 API Endpoints to Implement

### 1. Chat Message Processing

**Endpoint**: `POST /api/v1/chat/message`

**Request**:
```javascript
{
  "userId": "user_12345",
  "message": "Where is my order?",
  "images": ["base64_image_data"],
  "conversationId": "conv_789",
  "context": {
    "activeOrder": "#ORD-12345",
    "lastMessages": 5,
    "sentiment": "neutral"
  }
}
```

**Response**:
```javascript
{
  "botMessage": "Your order #ORD-12345 is on its way! ETA: 25 mins",
  "category": "orders",
  "sentiment": "positive",
  "actions": [
    {
      "type": "track",
      "url": "/track/ORD-12345"
    }
  ],
  "shouldEscalate": false,
  "refundInitiated": false,
  "timestamp": "2024-06-15T14:30:00Z"
}
```

### 2. RAG Query

**Endpoint**: `POST /api/v1/rag/query`

**Request**:
```javascript
{
  "query": "Can I return items after 24 hours?",
  "topK": 5,
  "datasetTypes": ["policies", "faq"],
  "userId": "user_12345"
}
```

**Response**:
```javascript
{
  "results": [
    {
      "source": "Policies - Returns",
      "text": "Returns allowed within 24 hours of delivery...",
      "relevance": 0.95,
      "datasetId": "policies_001"
    }
  ],
  "processingTime": 245,
  "cached": false
}
```

### 3. Order Information

**Endpoint**: `GET /api/v1/orders/{userId}`

**Query Parameters**:
- `limit`: 10 (default)
- `status`: "active" | "delivered" | "cancelled" | "all"
- `includeCart`: true | false

**Response**:
```javascript
{
  "activeOrders": [
    {
      "orderId": "#ORD-12345",
      "status": "delivering",
      "eta": "25 mins",
      "deliveryPartner": "partner_123",
      "items": ["Fresh Milk x2", "Bread x1"],
      "totalAmount": 299,
      "createdAt": "2024-06-15T14:00:00Z"
    }
  ],
  "recentOrders": [
    {
      "orderId": "#ORD-12340",
      "status": "delivered",
      "deliveredAt": "2024-06-14T18:30:00Z",
      "items": 3,
      "totalAmount": 456
    }
  ],
  "currentCart": {
    "items": [
      {
        "productId": "prod_001",
        "name": "Fresh Milk",
        "quantity": 2,
        "price": 95
      }
    ],
    "totalItems": 2,
    "subtotal": 190
  }
}
```

### 4. Product Catalog Search

**Endpoint**: `GET /api/v1/products/search`

**Query Parameters**:
- `q`: "milk" (search query)
- `category`: "dairy" (optional)
- `limit`: 10

**Response**:
```javascript
{
  "products": [
    {
      "productId": "prod_001",
      "name": "Fresh Whole Milk",
      "price": 95,
      "originalPrice": 100,
      "inStock": true,
      "rating": 4.8,
      "description": "Pure fresh milk",
      "image": "/images/milk.jpg"
    }
  ],
  "total": 45,
  "suggestions": [
    {
      "productId": "prod_002",
      "name": "Toned Milk",
      "reason": "Alternative - 12% cheaper"
    }
  ]
}
```

### 5. Refund Processing

**Endpoint**: `POST /api/v1/refunds/initiate`

**Request**:
```javascript
{
  "orderId": "#ORD-12345",
  "userId": "user_12345",
  "reason": "damaged",
  "amount": 150,
  "images": ["base64_image_data"],
  "description": "Milk carton arrived with dent and leaking"
}
```

**Response**:
```javascript
{
  "refundId": "REF-123456",
  "status": "approved",
  "amount": 150,
  "originalAmount": 150,
  "refundMethod": "wallet",
  "expectedDate": "2024-06-20",
  "transactionId": "txn_789",
  "message": "Refund approved and will be credited within 3-5 business days"
}
```

### 6. Escalation to Human Agent

**Endpoint**: `POST /api/v1/escalation/create`

**Request**:
```javascript
{
  "userId": "user_12345",
  "conversationId": "conv_789",
  "reason": "frustration_escalation",
  "sentiment": "frustrated",
  "summary": "User is frustrated with repeated delivery delays",
  "chatTranscript": "...full chat history...",
  "priority": "high"
}
```

**Response**:
```javascript
{
  "ticketId": "TICKET-12345",
  "agentId": "agent_789",
  "agentName": "Sarah",
  "queuePosition": 1,
  "estimatedWaitTime": 180,
  "status": "assigned",
  "agentAvatar": "/avatars/sarah.jpg"
}
```

### 7. Dataset Upload (Admin)

**Endpoint**: `POST /api/v1/admin/datasets/upload`

**Form Data**:
- `file`: (multipart/form-data)
- `datasetType`: "faq" | "product" | "orders" | "policies" | "chat" | "profiles"
- `fileName`: "Q1_2024_FAQs"
- `fileFormat`: "pdf" | "json" | "csv" | "markdown"
- `vectorize`: true
- `description`: "Q1 2024 FAQ updates"

**Response**:
```javascript
{
  "datasetId": "dataset_12345",
  "fileName": "Q1_2024_FAQs",
  "status": "processing",
  "uploadedAt": "2024-06-15T14:30:00Z",
  "recordCount": 245,
  "vectorizationProgress": 0,
  "estimatedCompletionTime": 120
}
```

### 8. Dataset Status

**Endpoint**: `GET /api/v1/admin/datasets/{datasetId}`

**Response**:
```javascript
{
  "datasetId": "dataset_12345",
  "fileName": "Q1_2024_FAQs",
  "datasetType": "faq",
  "fileFormat": "pdf",
  "status": "active",
  "recordCount": 245,
  "vectorCount": 245,
  "uploadedAt": "2024-06-15T14:30:00Z",
  "vectorizedAt": "2024-06-15T14:35:00Z",
  "vectorizationQuality": 98.5,
  "indexingQuality": "GOOD",
  "diskUsage": "2.3 MB"
}
```

### 9. Analytics

**Endpoint**: `GET /api/v1/admin/analytics`

**Query Parameters**:
- `period`: "1d" | "7d" | "30d" | "custom"
- `startDate`: "2024-06-01" (if custom)
- `endDate`: "2024-06-15" (if custom)

**Response**:
```javascript
{
  "period": "1d",
  "metrics": {
    "totalConversations": 2345,
    "resolutionRate": 87,
    "avgResponseTime": 1200,
    "avgSatisfactionScore": 4.8,
    "escalationRate": 12,
    "sentimentDistribution": {
      "positive": 65,
      "neutral": 25,
      "frustrated": 10
    },
    "topIssues": [
      { "category": "orders", "percentage": 35 },
      { "category": "returns", "percentage": 28 }
    ]
  }
}
```

### 10. Chat Logs

**Endpoint**: `GET /api/v1/admin/chats`

**Query Parameters**:
- `status`: "resolved" | "escalated" | "pending"
- `sentiment`: "positive" | "neutral" | "frustrated"
- `limit`: 50
- `offset`: 0

**Response**:
```javascript
{
  "chats": [
    {
      "chatId": "#CHAT-2024-001",
      "userId": "user_12345",
      "userName": "John Doe",
      "startTime": "2024-06-15T14:30:00Z",
      "endTime": "2024-06-15T14:35:32Z",
      "duration": 332,
      "messageCount": 12,
      "status": "resolved",
      "sentiment": "positive",
      "category": "orders",
      "escalated": false
    }
  ],
  "total": 2345,
  "hasMore": true
}
```

## 🔄 Frontend Implementation

### Update script.js for API Calls

```javascript
// API Configuration
const API_BASE_URL = 'https://api.blinkit-support.com/api/v1';
const API_TIMEOUT = 10000;

// Send message with API
async function sendMessageToBackend(message, images = []) {
    try {
        const response = await fetch(`${API_BASE_URL}/chat/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getUserToken()}`
            },
            body: JSON.stringify({
                userId: getCurrentUserId(),
                message: message,
                images: images,
                conversationId: getCurrentConversationId(),
                context: {
                    activeOrder: getActiveOrder(),
                    sentiment: userSentiment
                }
            }),
            timeout: API_TIMEOUT
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        // Fallback to mock responses
        return generateMockResponse(message);
    }
}

// Fetch order information
async function fetchOrderInfo(userId) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${userId}`, {
            headers: {
                'Authorization': `Bearer ${getUserToken()}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching orders:', error);
        return null;
    }
}

// Process refund
async function processRefund(orderId, reason, amount, images) {
    try {
        const response = await fetch(`${API_BASE_URL}/refunds/initiate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getUserToken()}`
            },
            body: JSON.stringify({
                orderId,
                userId: getCurrentUserId(),
                reason,
                amount,
                images,
                description: getCurrentChatContext()
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Error processing refund:', error);
        return null;
    }
}

// Escalate to human agent
async function escalateToAgent(conversationId, reason) {
    try {
        const response = await fetch(`${API_BASE_URL}/escalation/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getUserToken()}`
            },
            body: JSON.stringify({
                userId: getCurrentUserId(),
                conversationId,
                reason,
                sentiment: userSentiment,
                summary: generateChatSummary(),
                chatTranscript: getChatHistory(),
                priority: userSentiment === 'frustrated' ? 'high' : 'medium'
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Error escalating:', error);
        return null;
    }
}
```

## 🔐 Authentication

### JWT Implementation

```javascript
// Store token
function setUserToken(token) {
    localStorage.setItem('authToken', token);
}

// Get token
function getUserToken() {
    return localStorage.getItem('authToken');
}

// Refresh token
async function refreshToken() {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getUserToken()}`
        }
    });
    const { token } = await response.json();
    setUserToken(token);
}
```

## 🔄 Error Handling

```javascript
// Global error handler
fetch(`${API_BASE_URL}/endpoint`, {
    headers: { 'Authorization': `Bearer ${token}` }
})
.catch(error => {
    if (error.name === 'AbortError') {
        console.log('Request timeout');
    } else if (error.status === 401) {
        redirectToLogin();
    } else if (error.status === 403) {
        showPermissionError();
    } else {
        showGenericError('Something went wrong. Please try again.');
    }
});
```

## 📊 WebSocket for Real-time Updates (Optional)

```javascript
// Real-time order tracking
const socket = io('wss://api.blinkit-support.com', {
    auth: { token: getUserToken() }
});

socket.on('order:update', (data) => {
    updateOrderStatus(data);
});

socket.on('agent:assigned', (agent) => {
    notifyAgentAssigned(agent);
});
```

## 🧪 Testing Endpoints

### Using cURL

```bash
# Test chat message
curl -X POST http://localhost:3000/api/v1/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "userId": "user_12345",
    "message": "Where is my order?",
    "conversationId": "conv_789"
  }'

# Fetch orders
curl http://localhost:3000/api/v1/orders/user_12345 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman

1. Import the provided Postman collection (if available)
2. Set base URL to your API server
3. Add authorization token to headers
4. Test each endpoint with sample data

## 🚀 Deployment Checklist

- [ ] All API endpoints implemented and tested
- [ ] Authentication and authorization working
- [ ] Error handling for all failure cases
- [ ] Rate limiting configured
- [ ] CORS settings configured
- [ ] Database migrations run
- [ ] Vector database populated with datasets
- [ ] LLM API keys configured
- [ ] Payment gateway for refunds integrated
- [ ] Email notifications configured
- [ ] Logging and monitoring set up
- [ ] Performance optimization done
- [ ] Security audit completed

---

For detailed API specifications, refer to the OpenAPI/Swagger documentation.
