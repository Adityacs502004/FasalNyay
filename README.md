# 🌾 FasalNyay

# Live : https://fasal-nyay.vercel.app/

### AI-Assisted Crop Grievance & Evidence Verification Platform

**FasalNyay** is an AI-powered platform designed to help farmers document and submit crop-related grievances with reliable evidence. It acts as a digital **AI extension officer**, helping farmers understand what evidence is required, verify submitted documents and images, and identify inconsistencies before a claim is submitted.

---

## 🎯 The Problem

Farmers may face issues such as:

* Crop damage after extreme weather events
* Delayed or missing field surveys
* Disputes regarding reported crop yield or damage
* Difficulty understanding what evidence is required
* Limited access to timely agricultural guidance and extension services

Traditional grievance processes can involve multiple steps and require farmers to provide accurate documentation, which can be difficult without technical assistance.

---

## 💡 Our Solution

**FasalNyay simplifies the process by combining AI, image/document analysis, and evidence validation into a single workflow.**

The platform allows a farmer to:

1. **Select the type of grievance**

   * Yield Dispute
   * No Survey
   * Delayed

2. **Describe the issue** in a simple manner.

3. **Upload supporting evidence**, such as crop images and documents.

4. **Verify the submitted evidence using AI**, checking whether the uploaded material is relevant and whether important information is missing or inconsistent.

5. **Identify potential issues before submission**, reducing incomplete or unreliable claims.

The goal is not to replace official verification, but to help farmers prepare **better-organized and more credible evidence**.

---

## 🧠 AI-Assisted Verification

FasalNyay uses multimodal AI to analyze uploaded evidence.

Depending on the submission, the system can help identify:

* Whether an uploaded image appears relevant to the reported issue
* Whether the uploaded document is of the expected type
* Missing or insufficient evidence
* Potential inconsistencies in image metadata
* Information that may require further verification

The system is designed to **flag issues rather than make unsupported final decisions**.

---

## 🔄 How FasalNyay Works

```text
Farmer
   ↓
Select Grievance
   ↓
Describe the Issue
   ↓
Upload Evidence
   ↓
AI Verification
   ↓
Missing / Inconsistent Information?
   ├── Yes → Farmer is asked to provide better evidence
   └── No  → Continue with submission
   ↓
Structured Grievance
```

---

## 🛠️ Technology

**Frontend**

* React
* Vite
* Tailwind CSS

**Backend**

* Node.js
* Express.js

**AI**

* Google Gemini / Google GenAI
* Multimodal image and document analysis

**Additional Technologies**

* JavaScript
* Multer for file handling
* EXIF metadata extraction
* REST APIs

---

## 🚀 Key Features

* 🌾 **Agriculture-focused grievance workflow**
* 🤖 **AI-assisted image and document verification**
* 📷 **Evidence validation before submission**
* 🧾 **Document and file-type checking**
* 📍 **Image metadata analysis where available**
* ⚠️ **Detection of missing or inconsistent information**
* 👨‍🌾 **Designed with farmers and low-complexity workflows in mind**
* 🔒 **AI-assisted validation rather than unsupported automated decisions**

---

## 🌱 Impact & Future Scope

FasalNyay can help make agricultural grievance processes more accessible by reducing confusion around evidence collection and helping farmers identify problems before submitting a claim.

Future development could include:

* Voice-based interaction for farmers
* Support for regional Indian languages
* Integration with government agricultural schemes and advisories
* Retrieval-Augmented Generation (RAG) using verified agricultural sources
* Location and satellite-based field verification
* Integration with official grievance and claim systems
* Human-in-the-loop review for complex cases

---

## 📌 Project Status

FasalNyay was developed as a **hackathon prototype** demonstrating an AI-assisted approach to agricultural grievance and evidence verification.

The current prototype focuses on the core workflow, AI-assisted validation, and user experience required to demonstrate the concept.

---

## 👨‍💻 Built For

**Devengers Hackathon**

FasalNyay — *Making agricultural grievance documentation simpler, clearer, and more evidence-driven.*

---
