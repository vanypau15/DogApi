// controllers/dogController.js
const registerDog = async (req, res) => {
  try {
    const { name, description } = req.body;
    const dog = new Dog({
      name,
      description,
      registeredBy: req.user.userId
    });
    await dog.save();
    
    // Add dog to user's registeredDogs array
    await User.findByIdAndUpdate(req.user.userId, {
      $push: { registeredDogs: dog._id }
    });
    
    res.status(201).json(dog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const adoptDog = async (req, res) => {
  try {
    const { adoptionMessage } = req.body;
    const dog = await Dog.findById(req.params.id);
    
    // Validation checks
    if (!dog) return res.status(404).json({ error: 'Dog not found' });
    if (dog.status === 'adopted') return res.status(400).json({ error: 'Dog already adopted' });
    if (dog.registeredBy.equals(req.user.userId)) {
      return res.status(400).json({ error: 'Cannot adopt your own dog' });
    }
    
    // Update dog status
    dog.status = 'adopted';
    dog.adoptedBy = req.user.userId;
    dog.adoptionMessage = adoptionMessage;
    await dog.save();
    
    // Update user's adoptedDogs array
    await User.findByIdAndUpdate(req.user.userId, {
      $push: { adoptedDogs: dog._id }
    });
    
    res.json(dog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getRegisteredDogs = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = { registeredBy: req.user.userId };
    
    if (status) query.status = status;
    
    const dogs = await Dog.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    res.json(dogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

